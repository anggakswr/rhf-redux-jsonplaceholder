"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "@/store";

interface CustomProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default function CustomProviders(props: CustomProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{props.children}</Provider>
    </QueryClientProvider>
  );
}
