import authHeader, { mock } from './api';
import Endpoints from './endpoints';
import type { VaultRecord } from '../types';
import { AllRecordsMock } from './mocks';
import axios from 'axios';

export async function getRecords() {
    const records = await axios.get<Array<VaultRecord>>(Endpoints.Get.GetAllRecords, { headers: authHeader() });
    if (records.status === 200) {
        return records.data;
    }
}

export async function getRecordById(id: string) {
    const records = await axios.get<VaultRecord>(Endpoints.Get.GetRecordById(id), { headers: authHeader() });
    if (records.status === 200) {
        return records.data;
    }
}

mock.onGet(Endpoints.Get.GetAllRecords).reply(200, AllRecordsMock);