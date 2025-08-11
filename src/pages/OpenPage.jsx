import { useState } from 'react'
import { OpenPageTab } from '../Const'
import TabGenNew from './open/TabGenNew'
import TabTemp from './open/TabTemp'
import TabSaved from './open/TabSaved'
import TabAdd from './open/TabAdd'

export default function OpenPage() {
  const [activeTabOpen, setActiveTabOpen] = useState(OpenPageTab.Saved)
  const tabItems = [
    { name: OpenPageTab.GenNew, content: <TabGenNew /> },
    { name: OpenPageTab.Temp, content: <TabTemp /> },
    { name: OpenPageTab.Saved, content: <TabSaved /> },
    { name: OpenPageTab.Add, content: <TabAdd /> },
  ]

  return (
    <div className="p-1 mt-8 flex justify-center items-center">
      <div className="w-full overflow-y-auto text-gray-800 dark:text-gray-200 transition-width duration-300 ease-in-out"
      >
        <div className="flex border-b border-gray-700 dark:border-gray-200">
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTabOpen(item.name)}
              className={`px-6 py-3 ${activeTabOpen === item.name ?
                'tab-title-active'
                :
                'tab-title'
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="p-4">
          <div>
            {
              tabItems.map((item, index) => (
                <div
                  key={index}
                  className={`${activeTabOpen === item.name ? 'block' : 'hidden'}`}
                >
                  {item.content}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}