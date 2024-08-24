import React from 'react'

const Loader = () => {
    return (
        <>
            <div class="text-center flex flex-col justify-center items-center h-[100vh]">
                <div
                    class="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                ></div>
                <h2 class="text-zinc-900 mt-4">Loading...</h2>
            </div>
        </>
    )
}

export default Loader;