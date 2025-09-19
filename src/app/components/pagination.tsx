"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export function CertificatesPagination({
  page,
  pages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < pages) onPageChange(page + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
           <PaginationPrevious
             className="text-[#92B917] hover:text-[#92B917] hover:border-[#92B917] border-[#92B917]"
             href="#"
             onClick={(e) => {
               e.preventDefault();
               handlePrevious();
             }}
             aria-disabled={page === 1}
           />
        </PaginationItem>

        {[...Array(pages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
               href="#"
               isActive={page === i + 1}
               className={page === i + 1 ? "border-[#92B917] text-[#92B917] hover:text-[#92B917] hover:border-[#92B917]" : "hover:text-[#92B917] hover:border-[#92B917]"}
               onClick={(e) => {
                 e.preventDefault();
                 onPageChange(i + 1);
               }}
             >
               {i + 1}
             </PaginationLink>
          </PaginationItem>
        ))}

        {pages > 5 && <PaginationEllipsis />}

        <PaginationItem>
           <PaginationNext
             className="text-[#92B917] hover:text-[#92B917] hover:border-[#92B917] border-[#92B917]"
             href="#"
             onClick={(e) => {
               e.preventDefault();
               handleNext();
             }}
             aria-disabled={page === pages}
           />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
