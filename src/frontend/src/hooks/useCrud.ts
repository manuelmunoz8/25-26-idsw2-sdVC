import { useState, useEffect, useCallback } from 'react';
import { IBaseService } from '../types/base.service';

export function useCrud<T>(service: IBaseService<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const result = await service.getAll();
      setData(result);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const create = async (item: Partial<T>) => {
    try {
      const newItem = await service.create(item);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError('Error al crear el elemento');
      throw err;
    }
  };

  const update = async (id: string, item: Partial<T>) => {
    try {
      const updatedItem = await service.update(id, item);
      setData(prev => prev.map(i => (i as any).id === id ? updatedItem : i));
      return updatedItem;
    } catch (err) {
      setError('Error al actualizar el elemento');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await service.delete(id);
      setData(prev => prev.filter(i => (i as any).id !== id));
    } catch (err) {
      setError('Error al eliminar el elemento');
      throw err;
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    data,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove
  };
}
