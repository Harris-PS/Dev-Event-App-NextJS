'use client'
import Image from "next/image"
const ExploreBtn = () => {
  return (
    <button
      type="button"
      className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-8 py-3.5 max-sm:w-full text-center mt-7 mx-auto"
      onClick={() => console.log("Click")}
    >
      <a href="#events" className="flex items-center justify-center gap-2 text-center w-full">
        Explore Events
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
      </a>
    </button>
  )
}

export default ExploreBtn