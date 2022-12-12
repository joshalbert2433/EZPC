import React from "react";

function Pagination(props) {
    const { page, total, limit, setPage } = props;

    const totalPages = Math.ceil(total / limit);

    const onClick = (newPage) => {
        setPage(newPage + 1);
    };

    return (
        <div className="btn-group">
            {totalPages > 0 &&
                [...Array(totalPages)].map((val, index) => (
                    <button
                        key={index}
                        className={`btn ${
                            page === index + 1 ? "btn-active" : null
                        }`}
                        onClick={() => onClick(index)}
                    >
                        {index + 1}
                    </button>
                ))}
        </div>
    );
}

export default Pagination;
