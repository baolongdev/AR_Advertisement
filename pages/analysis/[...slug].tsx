import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getSignedUrlFileStorageByKey, getDataDatabaseByKey } from '../../components/utils/supabase-storage';
import { DateRangePickerValue, Select, SelectItem } from "@tremor/react";
import DateRangePickerComp, { getDateAgo } from '../../components/analysis/DateRangePicker';
import analyticsVercelApi from '../api/analyticsVercelApi';
import AreaChartVisul from '../../components/analysis/AreaChartVisul';
import ListBarVisul from '../../components/analysis/ListBarVisul';


export default function render() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const [filterValue, setFilterValue] = useState('Tất cả');
    const [dateSelect, setDateSelect] = useState({
        from: getDateAgo(1),
        to: new Date(),
        selectValue: "24h"
    });
    const [selectValue, setSelectValue] = useState("24h")

    const [dataRender, setDataRender] = useState({
        url: "",
        title: "",
        description: "",
        color: "",
        email: "",
        placement: false,
        fileContent: false,
    });
    useEffect(() => {
        const fetchData = async () => {
            const key = router.query.slug;

            if (key) {
                try {
                    setLoading(true);

                    const fileUrl = await getSignedUrlFileStorageByKey(key[0]);
                    const data = await getDataDatabaseByKey(key[0]);

                    if (data) {
                        setDataRender({ ...data, url: fileUrl });
                    }

                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch data", error);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [router.query.slug]);


    const [dataResponseAll, setDataResponseAll] = useState<any>({});
    useEffect(() => {
        const fetchProductList = async () => {
            const { from, to, selectValue } = dateSelect
            setSelectValue(selectValue)
            const key = router.query.slug;
            if (!from || !to || !key) {
                return;
            }

            const params = {
                "environment": "production",
                "filter": JSON.stringify({ "path": { "values": [`/model/${key}`], "operator": "eq" } }),
                "limit": 250,
                "projectId": "ar-advertisement",
                "from": from.toISOString(),
                "to": to.toISOString(),
            }

            try {
                const responseAll = await analyticsVercelApi.getAll(params);
                const allResponses = await Promise.all(
                    Object.values(responseAll).map(promise => promise.then(response => response.data))
                );
                const updatedProductList = Object.keys(responseAll).reduce((acc, key, index) => {
                    return { ...acc, [key]: allResponses[index] };
                }, {});

                setDataResponseAll(updatedProductList);
            } catch (error) {
                console.log("Failed to fetch product list", error)
            }
        }

        fetchProductList();
    }, [dateSelect, router.query.slug])



    return (
        <section className="analysis w-screen overflow-auto section">
            <div className='content'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="header flex sm:!flex-row !flex-col gap-5">
                            <div className='flex flex-row items-center gap-5 w-full'>
                                <a className='hover:left-4 transition duration-150 ease-in-out cursor-pointer'
                                    href='/account'
                                >
                                    <span className="btn__ico rotate-180">&nbsp;</span>
                                </a>
                                <p className="title whitespace-nowrap !text-xl sm:!text-3xl">Dự án:
                                    <span className='bg-white rounded-md text-black mx-3 px-3 text-ellipsis whitespace-nowrap'>
                                        {dataRender.title.length > 10 ? dataRender.title.slice(0, 20) + '...' : dataRender.title}
                                    </span>
                                </p>
                            </div>
                            <div className='filterSort flex flex-col sm:flex-row'>
                                <Select placeholder={filterValue} onValueChange={setFilterValue}>
                                    <SelectItem value="all">
                                        Tất cả
                                    </SelectItem>
                                </Select>
                                <DateRangePickerComp placeholder={dateSelect} onValueChange={setDateSelect} />
                            </div>
                        </div>
                        <div className="dashboard max-sm:!p-0 max-sm:!pt-10 pt-10 gap-5">
                            <AreaChartVisul data={dataResponseAll.timeseries} type={selectValue} />
                            <div className='grid_stack'>
                                <div className='grid_stack-2'>
                                    <ListBarVisul data={dataResponseAll.path} title={"Top Pages"} />
                                    <ListBarVisul data={dataResponseAll.referrer} title={"Top Referrers"} />
                                </div>
                                <div className='grid_stack-2'>
                                    <ListBarVisul data={dataResponseAll.country} title={"Countries"} />
                                    <ListBarVisul data={dataResponseAll.os_name} title={"Operating Systems"} />
                                    <ListBarVisul data={dataResponseAll.client_name} title={"Browsers"} />
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </section>
    )
}