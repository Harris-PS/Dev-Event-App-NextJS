'use client'
import Image from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
  const handleClick = () => {
    posthog.capture('explore_events_clicked', {
      button_location: 'homepage_hero',
    });
  };

  return (
    <button
      type="button"
      className="border-dark-200 bg-dark-100 flex w-fit cursor-pointer rounded-full border px-8 py-3.5 max-sm:w-full text-center mt-7 mx-auto"
      onClick={handleClick}
    >
      <a href="#events" className="flex items-center justify-center gap-2 text-center w-full">
        Explore Events
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
      </a>
    </button>
  )
}

export default ExploreBtn
