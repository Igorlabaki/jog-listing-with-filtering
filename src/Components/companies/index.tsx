import { Company, User } from "@prisma/client";
import React, { useEffect } from "react";
import useCompanyContext from "../../hook/useCompanyContext";
import { CompanyComponent } from "./company";

export default function CompaniesComponent() {
  const { companiesList, getAllCompanies } = useCompanyContext();

  useEffect(() => {
    if (getAllCompanies) {
      getAllCompanies();
    }
  }, []);

  return (
    <div
      className={`flex flex-col flex-1 min-h-screen space-y-16 md:space-y-2 mt-9
  py-5 md:py-0 my-7  md:my-0 md:mt-8`}
    >
      {companiesList?.map((company: Company) => {
        return (
          <div key={company.id} className="">
            <CompanyComponent company={company} key={company.id} />
          </div>
        );
      })}
    </div>
  );
}
