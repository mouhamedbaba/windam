import React from 'react'

export const ProfileBar = () => {
  return (
    <div className="bg-white dark:bg-slate-800  h-24 rounded-3xl px-4">
                <div className="h-full w-full flex flex-row gap-2 justify-center items-center py-4">
                  <div className=" grow flex gap-2  ">
                    <div className=" grow">
                      <div className="flex min-w-0 gap-x-4">
                        <div
                          className="h-12 w-12 flex-none rounded-full bg-gray-500 animate-pulse"
                          // src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          // alt=""
                        ></div>
                        <div className="min-w-0 flex-auto">
                          <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-100">
                            Mouhamed Lamotte
                          </div>
                          <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1  ">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                            </div>
                            <div className="text-xs leading-5 text-gray-500">
                              Online
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex min-w-0 gap-x-2 justify-centers items-center ">
                      <button className="bg-white text-slate-900 border px-5 rounded-2xl font-bold h-full">
                        Profile
                      </button>
                      <button className="text-white bg-slate-900 border px-5 rounded-2xl font-bold h-full">
                        Call
                      </button>
                    </div>
                  </div>
                  <div className=" flex gap-2 border-l h-full ms-2  justify-center items-center animate-pulse">
                    <div className="ms-2 w-10 h-10 rounded-full bg-slate-300"></div>
                    <div className="me-2 w-10 h-10 rounded-full bg-slate-300">
                      {" "}
                    </div>
                  </div>
                </div>
              </div>
  )
}
