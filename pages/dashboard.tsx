import React from "react";
import { PrimaryOperationsMenu } from "../components/PrimaryOperationsMenu";
import { ShowsLayout } from "../components/ShowsLayout";

export default ({
  serverStack,
  serverStackName,
}: {
  serverStack: [
    {
      img: string;
      title: string;
      tags: [string];
      description: string;
    }
  ];
  serverStackName: string;
}) => {
  const [stack, setStack] = React.useState([]);

  React.useEffect(() => {
    if (stack === undefined) return;
    localStorage.setItem(serverStackName, JSON.stringify(stack));
  }, [stack]);

  return (
    <div className="relative flex-1 w-full max-h-full">
      <div className="absolute inset-0 flex flex-col items-center overflow-scroll bg-gray-900">
        <div className="w-full max-w-7xl">
          <ShowsLayout />
        </div>
      </div>
      <PrimaryOperationsMenu />
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      serverStackName: "My Stack",
      serverStack: [
        {
          img:
            "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88314/91406/Blade-Runner-2049-Final-Style-Poster-buy-original-movie-posters-at-starstills__83407.1519904794.jpg?c=2&imbypass=on",
          title: "Blade Runner 2049",
          tags: ["TAG 1", "TAG 2", "TAG 3", " TAG 4"],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla...",
        },
      ],
    },
  };
};

/*
<>
    //   {/* <div className="relative flex-1 w-full overflow-scroll">
    //     <div className="absolute w-full">
    //       <div className="w-full max-w-5xl p-8 mx-auto md:p-4">
    //         <h1 className="sticky text-6xl font-semibold tracking-wider text-center text-gray-900 mt-28">
    //           My Stack
    //         </h1>
    //         <div className="h-12" />
    //         {stack.map((show) => (
    //           <PrimaryCard key={show.title} {...show} />
    //         ))}
    //       </div>
    //     </div>
    //   </div> 

    //   <div className="absolute bottom-0 left-0 z-10 m-4">
    //       <button
    //         onClick={() => setOperationsMenuIsOpen(!operationsMenuIsOpen)}
    //         className={`p-2 text-white transition-transform duration-300 ease-in-out transform bg-red-600 rounded-full pointer-events-auto hover:scale-105 focus:outline-none ${
    //           operationsMenuIsOpen ? "rotate-45" : ""
    //         }`}
    //       >
    //         <svg
    //           width={32}
    //           height={32}
    //           viewBox="0 0 24 24"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //           className=""
    //         >
    //           <path
    //             d="M12 4V20M20 12L4 12"
    //             stroke="currentColor"
    //             strokeWidth={2}
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //     <div className="absolute bottom-0 left-0 flex items-center justify-start h-12 m-4 ml-10 overflow-hidden">
    //       <div
    //         className={`relative transform pl-8 pr-2 py-2 rounded-r-full transition-transform duration-1000 ease-in-out ${
    //           operationsMenuIsOpen ? "" : "-translate-x-full"
    //         }`}
    //       >
    //         <div className="absolute inset-0 flex items-center justify-center">
    //           <hr className="w-full h-1 -ml-8 bg-red-600 border-none" />
    //         </div>
    //         <OperationButton
    //           onClick={() => {
    //             setOpenModalName("Add A Show");
    //           }}
    //         >
    //           Add A Show
    //         </OperationButton>
    //         <OperationButton
    //           onClick={() => {
    //             setOpenModalName("Add A Stack");
    //           }}
    //         >
    //           Add A Stack
    //         </OperationButton>
    //       </div>
    //     </div>
    //   </div>
    //   {(() => {
    //     // cSpell:words Formik
    //     switch (openModalName) {
    //       case "Add A Show": {
    //         return (
    //           <AddShowModal
    //             onClose={() => setOpenModalName(undefined)}
    //             stack={stack}
    //             setStack={setStack}
    //           />
    //         );
    //       }
    //       case "Add A Stack": {
    //         return (
    //           <Modal isOpen onClose={() => setOpenModalName(undefined)}>
    //             <div className="w-full max-w-2xl p-4 mt-6 rounded-lg shadow-lg bg-gray-50">
    //               <h1 className="text-3xl font-semibold tracking-wider text-gray-900 ">
    //                 {openModalName}
    //               </h1>
    //               <Formik
    //                 initialValues={{ stackName: "" }}
    //                 onSubmit={(values, actions) => {}}
    //               >
    //                 {({ handleChange, handleBlur, values }) => (
    //                   <form className="mt-4">
    //                     <div>
    //                       <label
    //                         htmlFor="stackName"
    //                         className="block text-sm font-medium leading-5 text-gray-700"
    //                       >
    //                         Stack Name
    //                       </label>
    //                       <div className="relative mt-1 rounded-md shadow-sm">
    //                         <input
    //                           id="stackName"
    //                           name="stackName"
    //                           onChange={handleChange}
    //                           onBlur={handleBlur}
    //                           value={values.stackName}
    //                           className="block w-full form-input sm:text-sm sm:leading-5 focus:shadow-outline-red focus:border-red-300"
    //                           placeholder="My New Stack"
    //                         />
    //                       </div>
    //                     </div>
    //                     <div className="mt-4 rounded-md shadow-sm">
    //                       <button
    //                         type="button"
    //                         className="flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
    //                       >
    //                         Submit
    //                       </button>
    //                     </div>
    //                   </form>
    //                 )}
    //               </Formik>
    //             </div>
    //           </Modal>
    //         );
    //       }
    //       default:
    //         return null;
    //     }
    //   })()}
    // </>
*/
