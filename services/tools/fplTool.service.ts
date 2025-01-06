import axios from "axios";
import type { BootstrapStatic } from "fpl-interfaces";

export const fplToolService = () => {
    const { $apiClient } = useNuxtApp();
  
    const getBootstrapStatic = async () => {
      try {
        const result = await $apiClient.get<BootstrapStatic>('/tools/fpl/bootstrap');
        return result?.data;
      } catch (error) {
        if (axios.isAxiosError(error))
          throw(error.response?.data);
      }
    }

    const getManager = async (teamId: number) => {
      try {
        const result = await $apiClient.get<any>(`/tools/fpl/manager/${teamId}`);
        return result?.data;
      } catch (error) {
        if (axios.isAxiosError(error))
          throw(error.response?.data);
      }
    }

    const getTransfers = async (teamId: number) => {
      try {
        const result = await $apiClient.get<any>(`/tools/fpl/manager/${teamId}/transfers`);
        return result?.data;
      } catch (error) {
        debugger;
        if (axios.isAxiosError(error))
          throw(error.response?.data);
      }
    }

    const getTeam = async (teamId: number, gameWeek: number) => {
      try {
        const result = await $apiClient.get<any>(`/tools/fpl/manager/${teamId}/${gameWeek}/team`);
        return result?.data;
      } catch (error) {
        if (axios.isAxiosError(error))
          throw(error.response?.data);
      }
    }

    const getHistory = async (teamId: number) => {
      try {
        const result = await $apiClient.get<any>(`/tools/fpl/manager/${teamId}/history`);
        return result?.data;
      } catch (error) {
        if (axios.isAxiosError(error))
          throw(error.response?.data);
      }
    }
  
    return {
      getBootstrapStatic,
      getManager,
      getTransfers,
      getTeam,
      getHistory
    }
  }
  