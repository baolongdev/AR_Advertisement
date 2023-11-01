import React from 'react';

function FeaturesTable() {
  const features = [
    {
      name: 'Unlimited Notes',
      description: 'Only limited by your storage space',
      starter: true,
      basic: true,
      believer: true,
    },
    {
      name: 'Attachment Size',
      description: 'Stuff you upload to Fleeting Notes',
      starter: '10MB',
      basic: '25MB',
      believer: '25MB',
    },
    {
      name: 'All offline features',
      description: '(e.g. Dark mode, Export, Search, Home widgets, Local file sync, E2EE, etc.)',
      starter: true,
      basic: true,
      believer: true,
    },
    {
      name: 'Access to apps on all platforms',
      description: 'Android, iOS, Web, Browser Ext (Chrome, Firefox)',
      starter: true,
      basic: true,
      believer: true,
    },
    {
      name: 'Dedicated support',
      description: 'Everyone deserves dedicated support (<a className="underline" href="mailto:fleetingnotesapp@gmail.com">fleetingnotesapp@gmail.com</a>)',
      starter: true,
      basic: true,
      believer: true,
    },
    {
      name: 'Unlimited Logged In Devices',
      description: 'Logged in on all your devices',
      starter: false,
      basic: true,
      believer: true,
    },
    {
      name: 'AI Powered Link Suggestions',
      description: 'Use AI to help suggest what\'s the most relevant link',
      starter: false,
      basic: false,
      believer: true,
    },
  ];
  return (
    <section className='section !pt-0 !pb-44'>
      <div className="content max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">

          {/* Section header */}
          <div className="pb-12">
            <h2 className="h2">Features</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-b border-gray-200">
              {/* Table header */}
              <thead>
                <tr className="text-base sm:text-lg border-t border-gray-200">
                  <th className="text-bold text-left pr-2 py-4 min-w-48">Breakdown of features</th>
                  <th className="text-bold text-center px-2 py-4">Starter</th>
                  <th className="text-bold text-center px-2 py-4">Basic</th>
                  <th className="text-bold text-center px-2 py-4">Believer</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="text-sm sm:text-base pr-2 py-4">
                      <div className="font-medium underline">{feature.name}</div>
                      <div className="text-gray-600">{feature.description}</div>
                    </td>
                    <td className="text-sm px-2 py-4 text-center font-medium">
                      {feature.starter === true && (
                        <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      )}
                    </td>
                    <td className="text-sm px-2 py-4 text-center font-medium">
                      {feature.basic === true && (
                        <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      )}
                    </td>
                    <td className="text-sm px-2 py-4 text-center font-medium">
                      {feature.believer === true && (
                        <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Row */}
                {/* <tr className="border-t border-gray-200">
                  <td className="text-sm sm:text-base pr-2 py-4">
                    <div className="font-medium underline">Unlimited Notes</div>
                    <div className="text-gray-600">Only limited by your storage space</div>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                </tr> */}
                {/* Row */}
                {/* <tr className="border-t border-gray-200">
                  <td className="text-sm sm:text-base pr-2 py-4">
                    <div className="font-medium underline">Attachment Size</div>
                    <div className="text-gray-600">Stuff you upload to Fleeting Notes</div>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">10MB</td>
                  <td className="text-sm px-2 py-4 text-center font-medium">25MB</td>
                  <td className="text-sm px-2 py-4 text-center font-medium">25MB</td>
                </tr> */}
                {/* Row */}
                {/* <tr className="border-t border-gray-200">
                  <td className="text-sm sm:text-base pr-2 py-4">
                    <div className="font-medium underline">All offline features</div>
                    <div className="text-gray-600">(e.g. Dark mode, Export, Search, Home widgets, Local file sync, E2EE, etc.)</div>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                </tr> */}
                {/* Row */}
                {/* <tr className="border-t border-gray-200">
                  <td className="text-sm sm:text-base pr-2 py-4">
                    <div className="font-medium underline">Access to apps on all platforms</div>
                    <div className="text-gray-600">Android, iOS, Web, Browser Ext (Chrome, Firefox)</div>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                </tr> */}
                {/* Row */}
                {/* <tr className="border-t border-gray-200">
                  <td className="text-sm sm:text-base pr-2 py-4">
                    <div className="font-medium underline">Dedicated support</div>
                    <div className="text-gray-600">Everyone deserves dedicated support (<a className="underline" href="mailto:fleetingnotesapp@gmail.com">fleetingnotesapp@gmail.com</a>)</div>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                </tr> */}
                {/* Row */}
                {/* <tr className="border-t border-gray-200">
                  <td className="text-sm sm:text-base pr-2 py-4">
                    <div className="font-medium underline">Unlimited Logged In Devices</div>
                    <div className="text-gray-600">Logged in on all your devices</div>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-gray-400 opacity-75 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.72 1.293a1 1 0 00-1.415 0L6.012 4.586 2.72 1.293a1 1 0 00-1.414 1.414L4.598 6 1.305 9.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L7.426 6l3.293-3.293a1 1 0 000-1.414z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                </tr> */}
                {/* Row */}
                {/* <tr className="border-t border-gray-200">
                  <td className="text-sm sm:text-base pr-2 py-4">
                    <div className="font-medium underline">AI Powered Link Suggestions</div>
                    <div className="text-gray-600">Use AI to help suggest what's the most relevant link</div>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-gray-400 opacity-75 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.72 1.293a1 1 0 00-1.415 0L6.012 4.586 2.72 1.293a1 1 0 00-1.414 1.414L4.598 6 1.305 9.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L7.426 6l3.293-3.293a1 1 0 000-1.414z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-gray-400 opacity-75 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.72 1.293a1 1 0 00-1.415 0L6.012 4.586 2.72 1.293a1 1 0 00-1.414 1.414L4.598 6 1.305 9.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L7.426 6l3.293-3.293a1 1 0 000-1.414z" />
                    </svg>
                  </td>
                  <td className="text-sm px-2 py-4 text-center font-medium">
                    <svg className="w-3 h-3 fill-current text-green-500 inline-flex" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesTable;