import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

import { getData, getOverview, getTimeseries } from '../../hooks/useVercelApi';
import RenderTabelAnalytics from '../../components/analysis/renderTabelAnalytics'
import { toast } from 'react-toastify';
import LineChart from '../../components/analysis/LineChart';
import { getDataDatabaseByKey } from '../../components/utils/supabase-storage';



export default function render() {
    const router = useRouter();
    const key = router.query.slug;

    const [filterValue, setFilterValue] = useState('Tất cả');
    const [dateSelect, setDateSelect] = useState("");

    const [overview, setOverviewLoading] = useState(false);
    const [timeseries, setTimeseriesLoading] = useState(false);
    const [path, setPathLoading] = useState(false);
    const [referrer, setReferrerLoading] = useState(false);
    const [country, setCountryLoading] = useState(false);
    const [os_name, setOs_nameLoading] = useState(false);
    const [client_name, setClient_nameLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
        url: "",
        title: "",
        description: "",
        color: "",
        email: "",
        placement: false,
        fileContent: false,
    });


    // Hằng số
    const top_name = 'client_name';
    const environment = 'production';
    const filter = { "path": { "values": [`/model/${key}`], "operator": "eq" } };
    const projectId = 'ar-advertisement';

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    const handleSortChange = (e) => {
        setDateSelect(e.target.value);
        toast.success("Dữ liệu đang được cập nhật!");
    };
    useEffect(() => {
        const fetchData = async () => {
            const key = router.query.slug;

            if (key) {
                getDataDatabaseByKey(key[0]).then((data) => {
                    if (data) {
                        console.log(data);
                        setPost({ ...data }); // Set the 'url' property
                        setLoading(false);
                    } else {
                        setLoading(true);
                    }
                });
            }
        };
        fetchData();
    }, [router.query.slug]);


    const { data: overviewData, loading: overviewLoading, error: overviewError } = getOverview(
        environment,
        dateSelect,
        projectId,
        2500,
        filter
    );

    useEffect(() => {
        setOverviewLoading(overviewData);
        setTimeseriesLoading(timeseriesData);
        setPathLoading(pathData);
        setReferrerLoading(referrerData);
        setCountryLoading(countryData);
        setOs_nameLoading(os_nameData);
        setClient_nameLoading(client_nameData);
    }, [dateSelect, filterValue
        ,overview
        ,timeseries
        ,path
        ,referrer
        ,country
        ,os_name
        ,client_name])

    const { data: timeseriesData } = getTimeseries(
        environment,
        dateSelect,
        projectId,
        2500,
        filter
    );
    const { data: pathData, loading: pathLoading, error: pathError } = getData(
        "path",
        environment,
        dateSelect,
        projectId,
        2500,
        filter
    );
    const { data: referrerData, loading: referrerLoading, error: referrerError } = getData(
        "referrer",
        environment,
        dateSelect,
        projectId,
        2500,
        filter
    );
    const { data: countryData, loading: countryLoading, error: countryError } = getData(
        "country",
        environment,
        dateSelect,
        projectId,
        2500,
        filter
    );
    const { data: os_nameData, loading: os_nameLoading, error: os_nameError } = getData(
        "os_name",
        environment,
        dateSelect,
        projectId,
        2500,
        filter
    );
    const { data: client_nameData, loading: client_nameLoading, error: client_nameError } = getData(
        "client_name",
        environment,
        dateSelect,
        projectId,
        2500,
        filter
    );

    return (
        <section className="analysis w-screen overflow-auto section">
            <div className='content'>
                {loading ? ( // Conditional rendering based on the loading state
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="header flex sm:!flex-row !flex-col gap-5">
                            <a className='hover:left-4 transition duration-150 ease-in-out cursor-pointer'
                                href='/account'
                            >
                                <span className="btn__ico rotate-180">&nbsp;</span>
                            </a>
                            <p className="title">Dự án:
                                <span className='bg-white rounded-md text-black mx-3 px-3'>
                                    {post.title.length > 10 ? post.title.slice(0, 20) + '...' : post.title}
                                </span>
                            </p>
                            <div className="filterSort flex">
                                <div className="filter">
                                    <select value={filterValue} onChange={handleFilterChange}>
                                        <option value="all">Tất cả</option>
                                        <option value="product">Sản phẩm</option>
                                    </select>
                                </div>
                                <div className="filter ml-5">
                                    <select value={dateSelect} onChange={handleSortChange}>
                                        <option value="24h">24 giờ trườc</option>
                                        <option value="7d">7 ngày trước</option>
                                        <option value="30d">30 ngày trước</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard">
                            <div className="page_chart">
                                <div className="tabs_wrapper">
                                    <div className="tabs_scroll-container">
                                        <div className='tabs_tabs'>
                                            <button type="button" className='flex min-w-[220px] flex-shrink-0 cursor-pointer px-4 py-4 focus:outline-none bg-background-100 text-gray-1000 border-b-2 border-b-gray-1000 group-[.enable-vertical]:lg:border-b-0 group-[.enable-vertical]:lg:border-l-2 group-[.enable-vertical]:lg:border-l-gray-1000'>
                                                <div className='flex flex-col items-stretch justify-start gap-2'>
                                                    <div className='flex flex-col items-stretch justify-between'>
                                                        <p className='text_wrapper text_nowrap text-sm text-left'>Visitors</p>
                                                    </div>
                                                    <div className='flex flex-row items-center justify-start gap-2'>
                                                        <p className='text_wrapper tabs_title'>{overview ? overview["devices"] : 'Loading...'}</p>
                                                        <span className='tooltip_container'>
                                                            <div className='trend_trend trend_good'>
                                                                <p className="text_wrapper text-xs">+200%</p>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="tabs_tab-shadow-wrapper">
                                        <div className="tabs_tabs-shadow tabs_tabs-shadow--hidden">

                                        </div>
                                    </div>
                                </div>
                                {/* Line Chart */}
                                <div className="line_chart h-[450px] p-2 flex justify-evenly">
                                    <LineChart data={timeseries} dateSelect={dateSelect} />
                                </div>
                            </div>

                            <div className='grid_stack'>
                                <div className='grid_stack-2'>
                                    <RenderTabelAnalytics data={path} panel_title={"Top Pages"} />
                                    <RenderTabelAnalytics data={referrer} panel_title={"Top Referrers"} />
                                </div>
                                <div className='grid_stack-3'>
                                    <RenderTabelAnalytics data={country} panel_title={"Countries"} />
                                    <RenderTabelAnalytics data={os_name} panel_title={"Operating Systems"} />
                                    <RenderTabelAnalytics data={client_name} panel_title={"Browsers"} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}