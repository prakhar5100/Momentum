import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_API_KEY

export const postData = createAsyncThunk(
    "api/aihelp", 
    async (query : string, { rejectWithValue}) => {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                      { role: "user", content: query }
                    ],
                    temperature: 0.7,
                  }), 
                });

            if (!response.ok) {
                throw new Error("Failed to post data")
            }

            const data = await response.json()
            return data.choices[0].message.content
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const apiSlice = createSlice({
    name : "api",
    initialState : {
        data : null,
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(postData.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(postData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(postData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default apiSlice.reducer