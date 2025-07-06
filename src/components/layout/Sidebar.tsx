import React from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, cart, removeFromCart, updateCartItem } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping Cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(false)}
                            className="p-2"
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.length === 0 ? (
                              <div className="text-center py-12">
                                <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-300" />
                                <p className="mt-2 text-gray-500">Your cart is empty</p>
                              </div>
                            ) : (
                              cart.map((item) => (
                                <li key={item.id} className="py-6">
                                  <div className="flex">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop`}
                                        alt="Product"
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>Custom T-Shirt</h3>
                                          <p className="ml-4">${item.price.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          Size: {item.size} • Color: {item.color}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              updateCartItem(item.id, {
                                                quantity: Math.max(1, item.quantity - 1),
                                              })
                                            }
                                            className="p-1"
                                          >
                                            -
                                          </Button>
                                          <span className="text-gray-500">
                                            Qty {item.quantity}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              updateCartItem(item.id, {
                                                quantity: item.quantity + 1,
                                              })
                                            }
                                            className="p-1"
                                          >
                                            +
                                          </Button>
                                        </div>

                                        <div className="flex">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-1 text-red-500 hover:text-red-700"
                                          >
                                            <TrashIcon className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {cart.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="space-y-2">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500">
                            <p>Tax</p>
                            <p>${tax.toFixed(2)}</p>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-gray-900">
                            <p>Total</p>
                            <p>${total.toFixed(2)}</p>
                          </div>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Button
                            fullWidth
                            variant="primary"
                            size="lg"
                            onClick={() => setSidebarOpen(false)}
                          >
                            Checkout
                          </Button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{' '}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSidebarOpen(false)}
                              className="font-medium text-blue-600 hover:text-blue-500"
                            >
                              Continue Shopping
                            </Button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};