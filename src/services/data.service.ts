import Endpoints from '../constants/endpoints';
// import axios, { AxiosRequestConfig } from 'axios';
import type { VaultRecord } from '../types';

export async function getRecords(config?: any) {
    // return await axios.get<Array<VaultRecord>>(Endpoints.Get.GetAllRecords, config);
}

export async function getRecordById(id: string, config?: any) {
    // return await axios.get<VaultRecord>(Endpoints.Get.GetRecordById(id), config);
}