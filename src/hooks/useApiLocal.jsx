import { useEffect, useState } from "react";

export const useApiLocal = () => {
    const [locais, setLocais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalLocais, setTotalLocais] = useState(0);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        getLocais();
    }, []);

    const getLocais = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/locais`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            const data = await response.json();
            setLocais(data);
            setTotalLocais(data.length);
        } catch (error) {
            console.error("Erro ao buscar locais:", error);
            setError(error.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };


    const cadastrarLocal = async (formData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/locais`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            setTotalLocais(totalLocais + 1);
            console.log("Dados enviados com sucesso para a API.");
        }
        catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
        }
    };

    const editarLocal = async (formData, id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/locais/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            console.log("Dados enviados com sucesso para a API.");
        }
        catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
        }
    };

    const getLocalPorId = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/locais/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Erro ao buscar dados da API:", error);
        }
    };

    const removerLocal = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/locais/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            setTotalLocais(totalLocais - 1);
            console.log("Dados enviados com sucesso para a API.");
        }
        catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
        }
    };

    return {
        locais,
        totalLocais,
        loading,
        error,
        cadastrarLocal,
        editarLocal,
        getLocalPorId,
        removerLocal
    };
};
