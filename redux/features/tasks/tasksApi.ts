import { apiSlice } from '../api/apiSlice';

export const tasksApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMyTasks: builder.query({
			query: () => ({
				url: '/my-daily-tasks',
			}),
			providesTags: ['Task'],
		}),
		createTask: builder.mutation({
			query: (body) => ({
				url: '/tasks',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task'],
		}),
		completeTask: builder.mutation({
			query: (body) => ({
				url: 'complete-task',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Task', 'User'],
		}),

		// get tasks report
		getTasksReport: builder.query({
			query: () => ({
				url: '/tasks-reports',
			}),
			providesTags: ['Task'],
		}),
	}),
});

export const {
	useGetMyTasksQuery,
	useCompleteTaskMutation,
	useGetTasksReportQuery,
} = tasksApi;
