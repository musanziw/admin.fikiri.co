'use client'

import axios from "@/app/config/axios";

export async function postData(url: string, payload: any) {
    let data: any
    let error: string = ''

    try {
        const {data: response} = await axios.post(url, JSON.stringify(payload))
        console.log(response.data)
        data = response.data
    } catch (e: any) {
        error = e.response.data.message
    }
    return {
        data,
        error
    }
}

