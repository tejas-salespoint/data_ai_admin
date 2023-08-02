

// eslint-disable-next-line react/prop-types
const LayoutComponent = ({ children }) => {
  return (
    <div className="h-[100rem]">
    <main className="p-4 md:ml-64 h-full pt-20">
      <div className="border-2 border-dashed h-full rounded-lg border-gray-300 dark:border-gray-600 mb-4">
        {children}
      </div>
    </main>
  </div>
  );
};

export default LayoutComponent;
