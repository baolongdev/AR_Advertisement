import React, { useEffect, useState } from 'react'


export default function RenderTabelAnalytics({ data, panel_title }) {
  const [dataState, setDataState] = useState([]);
  useEffect(() => {
    if (data) {
      setDataState(data.data)
    }
  }, [data]);
  

  return (
    <div className="paner panel_container">
      <div className="panel_header">
        <p className="panel_title text-sm">{panel_title}</p>
        <p className="panel_label text-xs">VISITORS</p>
      </div>
      <div className="paner_visual">
        <div className='paner_visual-content'>
          {/* item */}
          {dataState?dataState.map((item, index) => (
            <div key={index} className='item_container' data-index={index}>
              <button className='panel_item panel_allow-hover' type='button'>
                <div className="panel_progress-wrapper">
                <div className="panel_progress" style={{ width: `${(item.devices / dataState[0].devices) * 100}%` }} />
                  <div className="panel_content px-5">
                    <div className='text_wrapper-block w-0 overflow-hidden flex-1 text-left'>
                      <p className='text_wrapper !text-sm'>
                        {item.key}
                        {/* You can access item.devices, item.total, and item.key here */}
                      </p>
                    </div>
                    <div className='panel_column text_wrapper-block w-0 overflow-hidden flex-1 text-right'>
                      <p className="text_wrapper !text-sm">
                        {item.devices}
                        {/* You can access item.devices, item.total, and item.key here */}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          )):<div> Loading...</div>}
        </div>
      </div>
      <div className="paner-bg"></div>
      <button type='submit' className='button_view_all'>
        <span className="button_content">Tất cả</span>
        <span className="button_suffix">
          <svg
            className="with-icon_icon__MHUeb"
            data-testid="geist-icon"
            fill="none"
            height={24}
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width={24}
            style={{ color: "currentcolor", width: 14, height: 14 }}
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </span>
      </button>
    </div>
  )
}
