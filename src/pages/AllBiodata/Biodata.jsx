import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PageHeading from "../../components/Shared/Utilities/PageHeading";
import BioDataCard from "../../components/Shared/Card/BioDataCard";
import BioSkelton from "../../components/Shared/Card/Skelton/BioSkelton";
import { useState } from "react";
import Dropdown from "../../components/Form/Dropdown";

const Biodata = () => {
  const axiosPublic = useAxiosPublic();

  // *Sorting states
  const [sortOption, setSortOption] = useState("younger");

  // *Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 3;

  const { data, isLoading } = useQuery({
    queryKey: ["biodata", currentPage],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/biodata?page=${currentPage + 1}&limit=${itemsPerPage}`,
      );
      return {
        biodata: data.biodata || [],
        totalPageNumber: setTotalPages(data.totalPageNumber) || 0,
        currentPageNumber: setTotalItems(data.currentPageNumber) || 0,
      };
    },
  });

  // *Handle Pagination
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="section-layout">
        <PageHeading
          heading={"Available Biodata"}
          text={"Choose Your Perfect Partner"}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <BioSkelton key={index} />
            ))}
        </div>
      </div>
    );
  }

  const { biodata } = data;

  return (
    <div className="section-layout">
      <title>Biodata | Pathway</title>
      <div className="flex-centric justify-between">
        <PageHeading
          heading={"Available Biodata"}
          text={"Choose Your Perfect Partner"}
        />
        <div className="flex justify-end">
          <Dropdown
            sortOptions={[
              { value: "younger", label: "Younger First" },
              { value: "older", label: "Older First" },
            ]}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
      </div>
      {/* Results Count */}
      <div className="mb-4">
        <p>
          {totalItems} Biodata Found
          {totalItems > 0 && (
            <span>
              (Showing {currentPage * itemsPerPage + 1}-
              {Math.min((currentPage + 1) * itemsPerPage)})
            </span>
          )}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {biodata.map((bio) => (
          <div key={bio._id}>
            <BioDataCard bio={bio} />
          </div>
        ))}
      </div>

      {/* Pagination Controls For Navigating Pages */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-centric mt-8"
        >
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={totalPages}
            forcePage={currentPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"flex gap-2 items-center"}
            pageLinkClassName={"pagination"}
            previousLinkClassName={"pagination"}
            nextLinkClassName={"pagination"}
            breakLinkClassName={"flex-centric w-8 h-8 cursor-pointer"}
            activeLinkClassName={"bg-primary text-white"}
            disabledLinkClassName={"hidden"}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Biodata;
