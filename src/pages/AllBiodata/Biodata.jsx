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
import RangeInput from "../../components/Form/RangeInput";

const Biodata = () => {
  const axiosPublic = useAxiosPublic();

  // *Sorting states
  const [genderSortOption, setGenderSortOption] = useState("all");
  const [divisionSortOption, setDivisionSortOption] = useState("all");
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });
  const [filterAge, setFilterAge] = useState(false);

  // *Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 3;

  const { data, isLoading } = useQuery({
    queryKey: [
      "biodata",
      currentPage,
      genderSortOption,
      divisionSortOption,
      filterAge,
    ],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/biodata?page=${currentPage + 1}&limit=${itemsPerPage}&type=${genderSortOption}&division=${divisionSortOption}&minAge=${ageRange.min}&maxAge=${ageRange.max}`,
      );
      return {
        biodata: data.biodata || [],
        totalPageNumber: setTotalPages(data.totalPageNumber) || 0,
        totalCount: setTotalItems(data.totalCount) || 0,
        minAge: setAgeRange({ [0]: data.minAge }),
        maxAge: setAgeRange({ [0]: data.maxAge }),
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
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <PageHeading
          heading={"Available Biodata"}
          text={"Choose Your Perfect Partner"}
        />
        <div className="mb-2 grid grid-cols-2 justify-items-end gap-2 md:grid-cols-4">
          <Dropdown
            sortOptions={[
              { value: "all", label: "Type" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            sortOption={genderSortOption}
            setSortOption={setGenderSortOption}
          />
          <Dropdown
            sortOptions={[
              { value: "all", label: "Division" },
              { value: "dha", label: "Dhaka" },
              { value: "cha", label: "Chattagram" },
              { value: "ran", label: "Rangpur" },
              { value: "bar", label: "Barisal" },
              { value: "khu", label: "Khulna" },
              { value: "mym", label: "Mymensingh" },
              { value: "syl", label: "Sylhet" },
            ]}
            sortOption={divisionSortOption}
            setSortOption={setDivisionSortOption}
          />
          <div className="mt-5 ml-2 md:mt-0 md:ml-0">
            <RangeInput
              label="Age Range"
              min={18}
              max={60}
              step={1}
              defaultMin={18}
              defaultMax={60}
              onChange={(range) => setAgeRange(range)}
            />
          </div>

          <button
            onClick={() => setFilterAge(!filterAge)}
            className="btn-secondary mt-5 ml-2 h-fit w-fit md:mt-0 md:ml-0"
          >
            Filter Age
          </button>
        </div>
      </div>
      {/* Results Count */}
      <div className="mb-4">
        <p>
          {totalItems} Biodata Found
          {totalItems > 0 && (
            <span>
              (Showing {currentPage * itemsPerPage + 1}-
              {Math.min((currentPage + 1) * itemsPerPage, totalItems)})
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
