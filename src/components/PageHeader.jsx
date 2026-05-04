export default function PageHeader({
  title,
  breadcrumb,
  children,
}) {
    const breadcrumbItems =
    typeof breadcrumb === "string"
    ? [breadcrumb] : breadcrumb || [];
return (
    <div
      id="pageheader-container"
      className="flex items-center justify-between p-4"
    >
      <div
        id="pageheader-left"
        className="flex flex-col"
      >
        <span
          id="page-title"
          className="text-3xl font-semibold"
        >
          {title}
        </span>

        <div
          id="breadcrumb-links"
          className="flex items-center font-medium space-x-2 mt-2 text-gray-500"
        >
          {breadcrumbItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2"
            >
              <span>{item}</span>
              {index < breadcrumbItems.length - 1 && (
                <span>/</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div id="action-button">
        {children}
      </div>
    </div>
  );
}