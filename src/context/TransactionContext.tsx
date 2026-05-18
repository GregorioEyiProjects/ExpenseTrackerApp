import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction, Summary } from "@/src/constants";

// 1. La forma del contexto — qué datos y funciones expone
interface TransactionContextType {}
