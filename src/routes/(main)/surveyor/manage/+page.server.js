// @ts-nocheck
import { server } from '$lib/store';
import { get } from 'svelte/store';

const serverDetails = get(server);

export const load = async () => {
    const response = await fetch(`http://${serverDetails.hostname}:${serverDetails.port}/surveyor/detail`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        }
    });

    const result = await response.json();
    const surveyors = result.data;

    return {
        surveyors: surveyors
    }
}