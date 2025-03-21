import { useState } from "react";
import axios from "axios";

export function useServiceRequest() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestService = async (serviceId, userId, date, additionalInfo) => {
        setLoading(true);
        try {
            const response = await axios.post("http://student.com/service-requests", {
                service_id: serviceId,
                user_id: userId,
                date,
                additional_info: additionalInfo,
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Failed to request service");
        } finally {
            setLoading(false);
        }
    };

    return { requestService, loading, error };
}
