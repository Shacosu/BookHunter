"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react";

export function PaginationComponent({ nextPage, prevPage, totalPages }: { nextPage: number | null, prevPage: number | null, totalPages: number }) {
  console.log(nextPage, prevPage, totalPages)
  const searchParams = useSearchParams();
  const defaultValue = Number(searchParams.get("page")) || 1;
  const pathname = usePathname();
  const { replace } = useRouter();


  const handleChange = (page: number) => {
    if (page < 1) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${encodeURI(params.toString())}`)
  }



  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="w-full flex justify-center items-center gap-8">
        {prevPage && (
          <button className="flex items-center text-gray-600 hover:border-t-base cursor-pointer" onClick={() => handleChange(defaultValue - 1)}>
            <ArrowLeft size={16} />
            <p className="text-sm ml-3 font-medium leading-none">Anterior</p>
          </button>
        )}
        <div className="flex items-center gap-3">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <div key={index} onClick={() => handleChange(page)}
                className={`text-sm font-medium leading-none cursor-pointer text-gray-600 p-2 ${defaultValue === page && "bg-base font-medium text-white"}`}>
                {page}
              </div>
            )
          })}
        </div>
        {nextPage && (
          <button className="flex items-center text-gray-600 hover:border-t-base cursor-pointer" onClick={() => handleChange(defaultValue + 1)}>
            <p className="text-sm mr-3 font-medium leading-none">Siguiente</p>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>

  )
}
