import React from 'react'

function ResponsiveTable({ head, body }) {
  return (
    <div className="w-full">
      <table className="w-full flex flex-row flex-no-wrap md:bg-white rounded-lg overflow-x-scroll md:shadow-lg py-5">
        <thead className="text-white">
          {
            body.map(_ => {
              let components = [];
              components.push(
                <tr className="bg-green-500 flex flex-col flex-no wrap md:table-row rounded-l-lg md:rounded-none mb-2 md:mb-0  whitespace-nowrap md:sticky top-0 left-0">
                  {
                    <>
                      {
                        head.map(headData => (
                          <th className="p-3 text-left">{headData}</th>
                        ))
                      }
                    </>
                  }
                </tr>
              );
              return components;
            })
          }
        </thead>

        <tbody className="flex-1 md:flex-none text-black">
          {
            body.map(b => {
              let components = [];
              components.push(
                <tr className="flex flex-col flex-no wrap md:table-row mb-2 md:mb-0">
                  {
                    b.map(content => (
                      <td className="border-grey-light border hover:bg-gray-100 p-3">{content}</td>
                    ))
                  }
                </tr>
              );
              return components;
            })
          }
        </tbody>

      </table>
    </div>
  )
}

export default ResponsiveTable