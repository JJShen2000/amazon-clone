import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { styled } from "@mui/material/styles";

import useUrlParams from "@/utils/useUrlParams";

const CustomStyledPagination = styled(Pagination)(({ theme }) => ({
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .1)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "16px 0 10px 0",
}));

const CustomStyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "white",
    border: "1px solid #000",
    borderRadius: "0px",
    fontWeight: "bold",
  },
  "& .MuiPaginationItem-icon": {
    fontSize: "15px",
  },
  "&.MuiPaginationItem-previousNext": {
    height: "46px",
    cursor: "pointer",
    padding: "12px",
  },
  "&.MuiButtonBase-root": {
    height: "46px",
    padding: "0 18.2px",
  },
}));

const CustomPagination = ({ productsPerPage, totalProducts }) => {
  const { getUrlParams, replaceUrlParams } = useUrlParams();
  const handleChange = (event, value) => {
    replaceUrlParams("page", value);
  };
  return (
    <div>
      <CustomStyledPagination
        page={Number(getUrlParams("page")) || 1}
        onChange={handleChange}
        count={Math.ceil(totalProducts / productsPerPage)}
        shape="rounded"
        renderItem={(item) => (
          <CustomStyledPaginationItem
            slots={{
              previous: (props) => <div {...props}>&lt;&ensp;Previous</div>,
              next: (props) => <div {...props}>&ensp;Next</div>,
            }}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default CustomPagination;
