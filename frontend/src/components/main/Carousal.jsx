import { Button } from "flowbite-react";

export default function Carousal() {
  return (
    <>
      <div
        style={{
          alignContent: "center",
          textAlign: "center",
          height: "auto",
          border: "1px solid black",
          backgroundColor: "#818D92",
        }}
      >
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            <div
              className="hidden duration-700 ease-in-out"
              data-carousel-item="active"
            >
              <img
                src="https://drive.google.com/thumbnail?id=1Nzl0X-nYS7X-7Vu-oW0ooFo6k3csHvd3&sz=w1000"
                className="absolute block w-1000 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="First image"
              ></img>
            </div>

            <div
              className="hidden duration-700 ease-in-out"
              data-carousel-item="active"
            >
              <img
                src="https://drive.google.com/thumbnail?id=1JXm3OwudwcKEC843PobQeFU6tMctBZyo&sz=w1000"
                className="absolute block w-1000 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="second image"
              />
            </div>

            <div
              className="hidden duration-700 ease-in-out"
              data-carousel-item="active"
            >
              <img
                src="https://drive.google.com/thumbnail?id=1bxvZExZr_YK_fgWIAJj4CrryM_WgRn9O&sz=w1000"
                className="absolute block w-1000 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="third image"
              />
            </div>

            <div
              className="hidden duration-700 ease-in-out"
              data-carousel-item="active"
            >
              <img
                src="https://drive.google.com/thumbnail?id=1oWPgL1WgUd6kRY_e00oLAPhXNa9UyDGg&sz=w1000"
                className="absolute block w-1000 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="fourth image"
              />
            </div>
          </div>

          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 2"
              data-carousel-slide-to="1"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to="2"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 4"
              data-carousel-slide-to="3"
            ></button>
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 5"
              data-carousel-slide-to="4"
            ></button>
          </div>

          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "98vw" }}>
        <Button
          size="xs"
          style={{
            display: "inline-flex",
            backgroundColor: "#ff532f",
            color: "#ddd5d0",
            borderRadius: "8px",
            padding: "3px",
            marginTop: "3px",
          }}
        >
          <a href="/library"> Capstone Presentation Video Library</a>
        </Button>
      </div>
    </>
  );
}

//method for adding thumbnails to carousel from google drive found at https://creator79.hashnode.dev/integrating-google-drive-imagevedios-into-your-react-app
