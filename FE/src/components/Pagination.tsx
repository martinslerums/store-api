import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useProductFilters from "@/hooks/useProductFilters";

type PaginationProps = {
  totalPages: number;
};

const Pagination = ({ totalPages }: PaginationProps) => {
  const { page = 1, setFilters } = useProductFilters();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setFilters({ page: newPage });
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    totalPages !== 1 && (
      <PaginationWrapper className="p-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
              isDisabled={page <= 1}
            />
          </PaginationItem>

          {pageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNumber);
                }}
                className={pageNumber === page ? "underline font-bold" : "font-semibold"}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
              isDisabled={page >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationWrapper>
    )
  );
};

export default Pagination;
