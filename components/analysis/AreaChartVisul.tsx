import { AreaChart, Card, Flex, Text, Metric, TabList, Tab, TabGroup, TabPanels, TabPanel, BadgeDelta } from '@tremor/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'

export default function AreaChartVisul({ data, type }) {
    const [dataState, setDataState] = useState([]);
    useEffect(() => {
        if (data) {
            const formattedData = data.data.map(item => {
                let key;
                if (type == '24h') {
                    key = format(new Date(item.key), 'hh:mm')
                } else {
                    key = format(new Date(item.key), 'dd/MM')
                }
                return {
                    ...item,
                    key: key,
                };
            });

            setDataState(formattedData);
            console.log(formattedData);
        }
    }, [data]);
    return (
        <div className="page_chart">
            <TabGroup>
                <TabList >
                    <Tab>
                        <div className='flex min-w-[220px] flex-shrink-0 cursor-pointer px-4 py-4 focus:outline-none text-gray-1000 border-b-2 border-b-slate-200'>
                            <div className='flex flex-col items-stretch justify-start gap-2'>
                                <Text className='text-left'>Visitors</Text>
                                <Flex className='gap-5'>
                                    <Metric>442,276</Metric>
                                    <BadgeDelta>10%</BadgeDelta>
                                </Flex>
                            </div>
                        </div>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AreaChart
                            className="h-[350px]"
                            data={dataState}
                            index="key"
                            categories={["devices"]}
                            colors={["blue"]}
                        />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
