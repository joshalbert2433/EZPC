import React, { useEffect, useState } from "react";
import EcomAPI from "../api/Ecomm.api";

function Index() {
    const [data, setData] = useState([]);

    const getUser = async () => {
        try {
            const response = await EcomAPI.get("/user");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Index;
