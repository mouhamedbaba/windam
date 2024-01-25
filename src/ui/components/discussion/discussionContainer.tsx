import React from 'react'

export const DiscussionContainer = () => {
  return (
    <div className="bg-white dark:bg-slate-800  h-full rounded-xl py-2 overflow-hidden  relative">
                <div className="h-full px-5 py-2 overflow-auto">
                  <div className="flex justify-center date mb">
                    <div className="box-date border rounded-3xl px-3 py-1">
                      10 June, 2004
                    </div>
                  </div>
                  <div className="flex justify-end chat mb-1">
                    <div>
                      <div className="box-chat  rounded-l-3xl rounded-t-3xl  px-4 py-2 bg-red-600 text-white-100 font-medium text-sm max-w-80 w-fit">
                        Ok, it's almost ready !
                      </div>
                      <span className="text-gray-300 text-base flex justify-end ">
                        5:12 PM
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-start chat mb-1 gap-x-2">
                    <div className="flex flex-col justify-end items-end pb-5">
                      <div
                        className="h-10 w-10 flex-none rounded-full bg-gray-500 animate-pulse"
                        // src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        // alt=""
                      ></div>
                    </div>
                    <div>
                      <div className="box-chat   rounded-r-3xl rounded-t-3xl  px-4 py-2 bg-slate-300 text-slate-800 font-medium text-sm max-w-80 w-fit">
                        how about theses pictures ?
                      </div>
                      <div className="bg-slate-400 max-w-60  mt-1 rounded-lg overflow-hidden max-h-96">
                        <img
                          className="cursor-pointer hover:opacity-100 opacity-90 "
                          src="/assets/img/templates.png"
                          alt=""
                        />
                      </div>
                      <span className="text-gray-300 text-base flex justify-start ">
                        5:12 PM
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end chat mb-1">
                    <div>
                      <div className="box-chat  rounded-l-3xl rounded-t-3xl  px-4 py-2 bg-red-600 text-white-100 font-medium text-sm max-w-80 w-fit">
                        looks cool, can you find more options ?
                      </div>
                      <span className="text-gray-300 text-base flex justify-end ">
                        5:12 PM
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-start chat mb-1 gap-x-2">
                    <div className="flex flex-col justify-end items-end pb-5">
                      <div
                        className="h-10 w-10 flex-none rounded-full bg-gray-500 animate-pulse"
                        // src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        // alt=""
                      ></div>
                    </div>
                    <div>
                      <div className="box-chat   rounded-r-3xl rounded-t-3xl  px-4 py-2 bg-slate-300 text-slate-800 font-medium text-sm max-w-80 w-fit">
                        Sure look at this one
                      </div>
                      <div className="bg-slate-400 max-w-60  mt-1 rounded-lg overflow-hidden max-h-96">
                        <img
                          className="cursor-pointer hover:opacity-100 opacity-90 "
                          src="/assets/img/templatess.jpg"
                          alt=""
                        />
                      </div>
                      <span className="text-gray-300 text-base flex justify-start ">
                        5:12 PM
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end chat mb-1">
                    <div>
                      <div className="box-chat  rounded-l-3xl rounded-t-3xl  px-4 py-2 bg-red-600 text-white-100 font-medium text-sm max-w-80 w-fit">
                        yup this one is better even if both are good ! great job
                        !
                      </div>
                      <span className="text-gray-300 text-base flex justify-end ">
                        5:12 PM
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-start chat mb-1 gap-x-2">
                    <div className="flex flex-col justify-end items-end pb-5">
                      <div
                        className="h-10 w-10 flex-none rounded-full bg-gray-500 animate-pulse"
                        // src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        // alt=""
                      ></div>
                    </div>
                    <div>
                      <div className="box-chat   rounded-r-3xl rounded-t-3xl  px-4 py-2 bg-slate-300 text-slate-800 font-medium text-sm max-w-80 w-fit text-start">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, asperiores iste? Quos iste cum nobis a neque quas. Obcaecati, ea architecto non alias exercitationem atque? Voluptas aut distinctio voluptatem sint.
                      </div>
                      
                      <span className="text-gray-300 text-base flex justify-start ">
                        5:12 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
  )
}
