const Download = () => {
  return (
    <a
      href="/api/links"
      download
      className="flex flex-shrink-0 bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700 text-sm border-4 text-white py-1 px-2 rounded"
    >
      Download list{" "}
      <span className="material-symbols-outlined md-18">download</span>
    </a>
  );
};

export default Download;
