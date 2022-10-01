import { useRouter } from "next/router";
import { FaReact } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import useAuthContext from "../../hook/useAuthContext";
import { CardComponent } from "../util/card";
import SkillsComponent from "../util/skills";

interface companyProps {
  company: any;
  token?: any;
}

export function CompanyComponent({ company }: companyProps) {
  const { handleOpenAuthModal, session } = useAuthContext();

  const router = useRouter();

  function handleRedirectAuthFilter() {
    if (session?.sessionToken) {
      router.push(`/company/${company?.id}`);
    } else if (!session?.sessionToken) {
      handleOpenAuthModal();
    }
  }

  return (
    <CardComponent>
      <div
        className="flex relative "
        onClick={() => {
          handleRedirectAuthFilter();
        }}
      >
        <div
          className="h-16 w-16 cursor-pointer bg-gray-200 rounded-full flex justify-center items-center  overflow-hidden 
         md:h-16 md:w-16 mr-5 absolute bottom-[3.0rem] md:relative md:bottom-0 shadow-lg"
        >
          {company.avatar ? (
            <img
              src={company?.avatar}
              alt="brand"
              className="h-full w-full rounded-full"
              color={"#000"}
              onClick={() => {
                handleRedirectAuthFilter();
              }}
            />
          ) : (
            <FaReact className="text-veryDarkGraishCyan text-[30px] md:text-[35px]" />
          )}
        </div>
        <div
          className={`space-y-1 pt-3 md:pt-0 flex flex-col justify-start items-start w-full`}
        >
          <div className="flex justify-between items-center w-full">
            <p
              className="text cursor-pointer
              text-[16px] md:text-[20px] text-desaturatedDarkCyan"
            >
              {company?.name}
            </p>
            <div className="text flex justify-center items-center space-x-1 text-[13px] md:text-[20px] text-desaturatedDarkCyan">
              <p>Jobs:</p>
              <p>{company?.Jobs?.length}</p>
            </div>
          </div>
          <div className="flex gap-x-1 text-darkGrayishYan text-[12px] ">
            <p>{company?.email}</p>
            <p>-</p>
            <p> {company?.Country?.name}</p>
          </div>
        </div>
      </div>
    </CardComponent>
  );
}
