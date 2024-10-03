import { useEffect, useState } from "react";
import { getCookie } from "./useCookies.js";
import { isTokenValid } from "./useValidaToken.js";

export const useApiLocal = () => {
    const [locais, setLocais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalLocais, setTotalLocais] = useState(0);
    const token = getCookie("authToken");

    useEffect(() => {
        getLocais();
    }, [token]);

    // const getLocais = async () => {
    //     const token = getCookie('token'); // Obtém o token, se existir

    //     // Se houver token, usamos /locais (requer autenticação), caso contrário, usamos /dashboard (público)
    //     const url = token
    //         ? `${import.meta.env.VITE_URL_API}/locais`  // URL para a página privada
    //         : `${import.meta.env.VITE_URL_API}/dashboard`; // URL para a página pública

    //     const headers = token
    //         ? { "Authorization": `Bearer ${token}` }  // Cabeçalho com token, se houver
    //         : {};  // Sem cabeçalho para a página pública

    //     try {
    //         const response = await fetch(url, { headers });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             alert(errorData.mensagem);
    //             return;
    //         }

    //         const data = await response.json();
    //         setLocais(data);
    //         setTotalLocais(data.length);
    //     } catch (error) {
    //         console.error("Erro ao buscar locais:", error);
    //         setError(error.message || "Erro desconhecido");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const getLocais = async () => {
        const token = getCookie('authToken'); // Obtém o token, se existir
        const usuarioId = getCookie('usuarioId'); // Obtém o ID do usuário do cookie
        const isListaLocaisPage = window.location.pathname === '/listaLocal'; // Verifica se está na página '/listalocais'
        console.log(isListaLocaisPage);
        console.log(token);

        // Verifica se o token existe e se a rota atual é '/listalocais'
        const url = token
            ? isListaLocaisPage
                ? `${import.meta.env.VITE_URL_API}/locais/${usuarioId}`  // Se na página '/listalocais', usa '/locais/:id'
                : `${import.meta.env.VITE_URL_API}/locais`  // Caso contrário, usa a lista geral de locais
            : `${import.meta.env.VITE_URL_API}/dashboard`; // Se não houver token, usa o endpoint público

        const headers = token
            ? {
                "Authorization": `Bearer ${token}`,  // Cabeçalho com token, se houver
                "Content-Type": "application/json"
            }
            : {};  // Sem cabeçalho para a página pública

        console.log(url);

        try {
            const response = await fetch(url, { headers });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            const data = await response.json();
            setLocais(data);
            setTotalLocais(data.length || 1); // Garante que o total seja atualizado corretamente
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
                    Authorization: `Bearer ${token}`
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
        } catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
        }
    };

    const editarLocal = async (formData, id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/locais/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            console.log("Dados enviados com sucesso para a API.");
        } catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
        }
    };

    const getLocalPorId = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/locais/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
        }
    };

    const removerLocal = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_URL_API}/locais/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.mensagem);
                return;
            }

            setTotalLocais(totalLocais - 1);
            console.log("Dados enviados com sucesso para a API.");
        } catch (error) {
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
