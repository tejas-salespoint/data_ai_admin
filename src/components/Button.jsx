import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Button = ({ label, loading ,activeUpdate , ...rest }) => {
    let value = "disbled"
    useEffect(() => {
        value = "change"
    },[activeUpdate])
    return (
        <button type="button" disabled={loading} {...rest}>
            {loading ? (
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H6c0 3.309 2.691 6 6 6zm8-7.291a7.963 7.963 0 00-4-6.928V2.618L15.382 4l-.708.707L13 2.618V4a7.963 7.963 0 00-6.928 4H4l2.325.775-.775 2.325h3.536A7.963 7.963 0 0012 20c1.74 0 3.346-.564 4.654-1.517l.775 2.325H20l-2.325-.775A7.96 7.96 0 0020 12z"
                    ></path>
                </svg>
            ) : (
                label
            )}

            { activeUpdate && value }
        </button>
    );
};

export default Button;