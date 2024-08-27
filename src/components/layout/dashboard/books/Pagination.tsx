"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationComponent() {

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
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handleChange(defaultValue - 1)}/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handleChange(defaultValue + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
