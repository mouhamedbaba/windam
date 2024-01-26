export const ChatPulse = () =>{
    return (
        <li className="hover:bg-slate-200 dark:bg-slate-900 bg-slate-100 dark:text-white-100 px-2 dark:hover:bg-slate-800 flex justify-between gap-x-6 py-5">
                      <div className="flex min-w-0 gap-x-4">
                          <div
                            className="h-12 w-12 flex-none rounded-full bg-gray-500 animate-pulse"
                            
                          ></div>
                          <div className="min-w-0 flex-auto">
                            <div className="text-sm font-semibold leading-6 bg-gray-500 h-5 w-28 animate-pulse rounded-sm  dark:text-slate-100">
                             
                            </div>
                            <div className="mt-1  h-4 w-20 bg-gray-500 animate-pulse rounded-sm">
                              
                            </div>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <div className=" text-xs  h-5 animate-pulse w-10  bg-gray-500 rounded-sm ">
                            
                          </div>
                          <div className="mt-2  h-4 w-4 rounded-full bg-gray-500 animate-pulse">
                            
                          </div>
                        </div>
                      </li>
    )
}