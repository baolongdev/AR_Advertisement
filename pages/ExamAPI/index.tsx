import React, { useEffect, useState } from 'react'
import analyticsVercelApi from '../api/analyticsVercelApi'
import { Card, Flex, BadgeDelta, Metric, Text } from '@tremor/react';

export default function index() {
    const [productList, setProductList] = useState([])
    function calculateDateRange(time: string): { from: Date; to: Date } {
        const now: Date = new Date();
        let from: Date, to: Date;

        if (time === "24h") {
            from = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
            to = now;
        } else if (time === "7d") {
            from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
            to = now;
        } else if (time === "30d") {
            from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
            to = now;
        } else {
            from = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
            to = now;
        }

        return { from, to };
    }
    useEffect(() => {

        const fetchProductList = async () => {
            try {
                const { from, to } = calculateDateRange("7d");
                const params = {
                    "environment": "production",
                    // "filter": { "path": { "values": [`/model/${key}`], "operator": "eq" } },
                    "projectId": "ar-advertisement",
                    "from": from,
                    "to": to,
                }
                const response = await analyticsVercelApi.getOverview(params);
                console.log(response);

            } catch (error) {
                console.log("Failed to fetch product list", error)
            }
        }

        fetchProductList();
    }, [])

    return (
        <div>
            <Card className="max-w-sm">
                <Flex justifyContent="between" alignItems="center">
                    <Text>Sales</Text>
                    <BadgeDelta deltaType="moderateIncrease" isIncreasePositive={true} size="xs">
                        +12.3%
                    </BadgeDelta>
                </Flex>
                <Metric>$ 23,456</Metric>
            </Card>
        </div>
    )
}
