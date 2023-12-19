import { mock } from './api';
import Endpoints from '../constants/endpoints';
import { AllRecordsMock } from './mocks';
import axios, { AxiosRequestConfig } from 'axios';
import type { VaultRecord } from '../types';

export async function getRecords(config?: AxiosRequestConfig) {
    return await axios.get<Array<VaultRecord>>(Endpoints.Get.GetAllRecords, config);
}

export async function getRecordById(id: string, config?: AxiosRequestConfig) {
    return await axios.get<VaultRecord>(Endpoints.Get.GetRecordById(id), config);
}

mock.onGet(Endpoints.Get.GetAllRecords).reply(200, AllRecordsMock);