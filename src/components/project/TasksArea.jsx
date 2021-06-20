import React, { useContext, useEffect, useState } from 'react';
import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Flex,
  Box,
  Text,
  Divider,
  Heading,
  Avatar,
  Spacer,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
  Tooltip,
  IconButton,
  useColorModeValue,
  Wrap,
  WrapItem,
  Badge,
  Circle,
  LinkBox,
  LinkOverlay,
  ButtonGroup,
  ModalHeader,
  HStack,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import {
  AddIcon,
  ArrowRightIcon,
  DeleteIcon,
  EditIcon,
  CheckIcon,
  ArrowLeftIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import { useQuery, useMutation, gql } from '@apollo/client';
import { PROJECT_DASHBOARD_QUERY, MARK_READ } from '../../graphql';
import { ProjectDashboardContext } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { Loading } from '../Loading';
import { AddTaskForm } from './AddTaskForm';
import { EditTaskForm } from './EditTaskForm';

export const TasksArea = () => {
  const authContext = useContext(AuthContext);
  const { setApplicants, setTasks } = useContext(ProjectDashboardContext);
  const toast = useToast();

  const dotBg = useColorModeValue('blue.400', 'blue.200');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const labelColor = useColorModeValue('gray.200', 'gray.800');

  const [tasksUnread, setTasksUnread] = useState([]);
  const [clickedTaskId, setClickedTaskId] = useState('');
  const [labelValue, setLabelValue] = useState('');
  const [deleteLabelValue, setDeleteLabelValue] = useState('');

  const {
    isOpen: detailsIsOpen,
    onOpen: detailsOnOpen,
    onClose: detailsOnClose,
  } = useDisclosure();

  const {
    isOpen: addIsOpen,
    onOpen: addOnOpen,
    onClose: addOnClose,
  } = useDisclosure();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const {
    isOpen: labelDrawerIsOpen,
    onOpen: labelDrawerOnOpen,
    onClose: labelDrawerOnClose,
  } = useDisclosure();

  const [modalValues, setModalValues] = useState({
    id: '',
    title: '',
    description: '',
    dev: null,
    status: '',
    startDate: Date.now(),
    dueDate: Date.now(),
    read: false,
  });

  const { data } = useQuery(PROJECT_DASHBOARD_QUERY, {
    pollInterval: 500,
    fetchPolicy: 'no-cache',
  });

  const [markRead] = useMutation(MARK_READ, {
    onError(err) {
      if (err.graphQLErrors[0]) {
        if (err.graphQLErrors[0].message === 'Argument Validation Error') {
          toast({
            title: Object.values(
              err.graphQLErrors[0].extensions.exception.validationErrors[0]
                .constraints
            )[0],
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        } else {
          toast({
            title: err.graphQLErrors[0].message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      } else {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    },
  });

  const [pushTask, { loading: pushLoading }] = useMutation(PUSH_TASK, {
    update(proxy, result) {
      setTasksUnread([]);
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        if (err.graphQLErrors[0].message === 'Argument Validation Error') {
          toast({
            title: Object.values(
              err.graphQLErrors[0].extensions.exception.validationErrors[0]
                .constraints
            )[0],
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        } else {
          toast({
            title: err.graphQLErrors[0].message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      } else {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    },
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    onError(err) {
      if (err.graphQLErrors[0]) {
        if (err.graphQLErrors[0].message === 'Argument Validation Error') {
          toast({
            title: Object.values(
              err.graphQLErrors[0].extensions.exception.validationErrors[0]
                .constraints
            )[0],
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        } else {
          toast({
            title: err.graphQLErrors[0].message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      } else {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    },
  });

  const [closeTask, { loading: closeLoading }] = useMutation(CLOSE_TASK, {
    onError(err) {
      if (err.graphQLErrors[0]) {
        if (err.graphQLErrors[0].message === 'Argument Validation Error') {
          toast({
            title: Object.values(
              err.graphQLErrors[0].extensions.exception.validationErrors[0]
                .constraints
            )[0],
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        } else {
          toast({
            title: err.graphQLErrors[0].message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      } else {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    },
  });

  const [addLabel, { loading: addLabelLoading }] = useMutation(ADD_LABEL, {
    update() {
      setLabelValue('');
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        if (err.graphQLErrors[0].message === 'Argument Validation Error') {
          toast({
            title: Object.values(
              err.graphQLErrors[0].extensions.exception.validationErrors[0]
                .constraints
            )[0],
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        } else {
          toast({
            title: err.graphQLErrors[0].message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      } else {
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    },
  });

  const [deleteLabel, { loading: deleteLabelLoading }] = useMutation(
    DELETE_LABEL,
    {
      onError(err) {
        if (err.graphQLErrors[0]) {
          if (err.graphQLErrors[0].message === 'Argument Validation Error') {
            toast({
              title: Object.values(
                err.graphQLErrors[0].extensions.exception.validationErrors[0]
                  .constraints
              )[0],
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
            });
          } else {
            toast({
              title: err.graphQLErrors[0].message,
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
            });
          }
        } else {
          toast({
            title: err.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
          });
        }
      },
    }
  );

  const project = data ? data.currentProject.project : null;

  useEffect(() => {
    if (
      project &&
      authContext.profile.projectOwner &&
      project.applicants.length > 0
    ) {
      const unreadApplicants = project.applicants.filter(
        applicant => applicant.read === false
      ).length;
      setApplicants(unreadApplicants);
    }
    if (
      project &&
      authContext.profile.activeProject &&
      project.tasks.length > 0
    ) {
      const unreadTasks = project.tasks.filter(
        task => task.read === false && authContext.user.id === task.dev.id
      ).length;
      setTasks(unreadTasks);

      for (const task of project.tasks) {
        if (task.read === false && authContext.user.id === task.dev.id) {
          tasksUnread.push(task.id);
        }
      }

      markRead({ variables: { path: 'tasks' } });
    }
  }, [project, setApplicants, authContext, setTasks, markRead, tasksUnread]);

  useEffect(() => {
    if (project && authContext.profile.activeProject && detailsIsOpen) {
      setModalValues(project.tasks.find(task => task.id === modalValues.id));
    }
  }, [project, setModalValues, authContext, detailsIsOpen, modalValues]);

  if (!data) {
    return <Loading />;
  }
  return (
    <Box>
      <Flex w="full" mt={4} alignItems="center">
        <Heading pt={4} as="h1" size="2xl">
          Tasks
        </Heading>
        <Spacer />
        <Box>
          {authContext.profile.projectOwner && (
            <>
              <ButtonGroup variant="outline" spacing="3">
                <Button
                  onClick={labelDrawerOnOpen}
                  leftIcon={<HamburgerIcon />}
                >
                  Labels
                </Button>
                <Button onClick={addOnOpen} leftIcon={<AddIcon />}>
                  Add Task
                </Button>
              </ButtonGroup>
              <Modal
                isOpen={addIsOpen}
                onClose={addOnClose}
                size="3xl"
                scrollBehavior="outside"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <AddTaskForm
                      members={project.members}
                      onClose={addOnClose}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          )}
        </Box>
      </Flex>
      <Divider />
      <HStack spacing={12} mt={4} alignItems="start">
        {project.taskColumns.map(column => (
          <VStack key={column} w="xs">
            <Heading w="full" as="h2" size="md">
              {column}
            </Heading>
            <Divider />
            {project.tasks.reduce((taskList, task) => {
              if (task.status === column) {
                taskList.push(
                  <LinkBox
                    p="3"
                    w="xs"
                    h="28"
                    rounded="lg"
                    borderWidth="1px"
                    borderColor={borderColor}
                    boxShadow="xl"
                    bg={cardBg}
                    key={task.id}
                  >
                    {' '}
                    <Flex
                      direction="column"
                      alignItems="start"
                      w="full"
                      h="full"
                    >
                      <LinkOverlay
                        cursor="pointer"
                        onClick={() => {
                          setModalValues(task);
                          detailsOnOpen();
                        }}
                      >
                        <Text w="full" isTruncated fontWeight="semibold">
                          {tasksUnread.includes(task.id) && (
                            <>
                              <Circle
                                size="2"
                                bg={dotBg}
                                display="inline-block"
                              />{' '}
                            </>
                          )}
                          {task.title}
                        </Text>
                      </LinkOverlay>
                      <Text
                        w="full"
                        color="gray.500"
                        fontStyle="italic"
                        fontSize="sm"
                        isTruncated
                      >
                        {task.description}
                      </Text>
                      <Text w="full" fontSize="sm" fontStyle="italic">
                        {task.startDate &&
                          task.dueDate &&
                          `${
                            new Date(task.startDate)
                              .toLocaleString('en-GB')
                              .split(',')[0]
                          } -  ${
                            new Date(task.dueDate)
                              .toLocaleString('en-GB')
                              .split(',')[0]
                          }`}
                        {!task.startDate &&
                          task.dueDate &&
                          `Due: ${
                            new Date(task.dueDate)
                              .toLocaleString('en-GB')
                              .split(',')[0]
                          }`}
                      </Text>
                      <Flex w="full" flexGrow={1} alignItems="end">
                        <Tooltip hasArrow label={task.dev.name}>
                          <Avatar size="xs" src={task.dev.avatar} />
                        </Tooltip>
                        <Spacer />
                        {!authContext.profile.projectOwner &&
                          authContext.user.id === task.dev.id &&
                          task.status !== 'DONE' &&
                          task.status !== 'COMPLETE' && (
                            <Tooltip hasArrow label="Push Task">
                              <IconButton
                                size="xs"
                                icon={<ArrowRightIcon />}
                                variant="outline"
                                isLoading={
                                  pushLoading && clickedTaskId === task.id
                                }
                                onClick={() => {
                                  setClickedTaskId(task.id);
                                  pushTask({ variables: { taskId: task.id } });
                                }}
                              />
                            </Tooltip>
                          )}
                        {authContext.profile.projectOwner &&
                          task.status !== 'COMPLETE' && (
                            <ButtonGroup size="xs" isAttached variant="outline">
                              {task.status === 'DONE' && (
                                <>
                                  <Tooltip hasArrow label="Send Task Back">
                                    <IconButton
                                      colorScheme="orange"
                                      icon={<ArrowLeftIcon />}
                                      variant="outline"
                                      onClick={() => {
                                        setClickedTaskId(task.id);
                                        editOnOpen();
                                      }}
                                    />
                                  </Tooltip>
                                  <Tooltip hasArrow label="Close Task">
                                    <IconButton
                                      colorScheme="green"
                                      icon={<CheckIcon />}
                                      variant="outline"
                                      isLoading={
                                        closeLoading &&
                                        clickedTaskId === task.id
                                      }
                                      onClick={() => {
                                        setClickedTaskId(task.id);
                                        closeTask({
                                          variables: { taskId: task.id },
                                        });
                                      }}
                                    />
                                  </Tooltip>
                                </>
                              )}
                            </ButtonGroup>
                          )}
                      </Flex>
                    </Flex>
                  </LinkBox>
                );
              }
              return taskList;
            }, [])}
          </VStack>
        ))}
      </HStack>
      <Modal
        isOpen={detailsIsOpen}
        onClose={detailsOnClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex
              w="full"
              pr={8}
              alignItems="start"
              justifyContent="space-between"
            >
              <Heading>{modalValues.title}</Heading>
              <Spacer />
              {authContext.profile.projectOwner &&
                modalValues.status !== 'COMPLETE' && (
                  <ButtonGroup>
                    <Tooltip hasArrow label="Edit Task">
                      <IconButton
                        size="sm"
                        icon={<EditIcon />}
                        variant="outline"
                        onClick={editOnOpen}
                      />
                    </Tooltip>
                    <Tooltip hasArrow label="Delete Task">
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        icon={<DeleteIcon />}
                        variant="outline"
                        onClick={deleteOnOpen}
                      />
                    </Tooltip>
                  </ButtonGroup>
                )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton mt={1.5} />
          <ModalBody px={8}>
            <Text pt={2} pb={6}>
              {modalValues.description}
            </Text>
            <Text fontWeight="bold" fontStyle="italic">
              Start Date:{' '}
              <Text as="span" color="gray.500">
                {modalValues.startDate
                  ? new Date(modalValues.startDate)
                      .toLocaleString('en-GB')
                      .split(',')[0]
                  : 'N/A'}
              </Text>{' '}
              Due Date:
              <Text as="span" color="gray.500">
                {modalValues.dueDate
                  ? new Date(modalValues.dueDate)
                      .toLocaleString('en-GB')
                      .split(',')[0]
                  : 'N/A'}
              </Text>
            </Text>

            <HStack mt="4" alignItems="center">
              <Text fontWeight="bold">Asignee: </Text>{' '}
              {modalValues.dev && (
                <Tooltip hasArrow label={modalValues.dev.name}>
                  <Avatar size="sm" src={modalValues.dev.avatar} />
                </Tooltip>
              )}
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={deleteOnClose}
        isOpen={deleteIsOpen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Task?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this Task?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={deleteOnClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              fontSize="md"
              onClick={() => {
                deleteTask({ variables: { taskId: modalValues.id } });
                deleteOnClose();
                detailsOnClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Modal
        isOpen={editIsOpen}
        onClose={editOnClose}
        size="3xl"
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <EditTaskForm
              taskValues={modalValues}
              members={project.members}
              onClose={editOnClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={labelDrawerIsOpen}
        placement="right"
        onClose={labelDrawerOnClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Labels</DrawerHeader>

          <DrawerBody>
            <InputGroup size="md">
              <Input
                type="text"
                placeholder="Add Label"
                value={labelValue}
                onChange={e => setLabelValue(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  colorScheme="green"
                  size="sm"
                  icon={<CheckIcon />}
                  variant="ghost"
                  onClick={() => {
                    addLabel({ variables: { label: labelValue } });
                  }}
                  isLoading={addLabelLoading}
                />
              </InputRightElement>
            </InputGroup>
            <VStack mt="6" w="full">
              {project.taskLabels.map(label => (
                <Box
                  rounded={'md'}
                  w="full"
                  p="1"
                  bg={labelColor}
                  boxShadow={'2xl'}
                  key={label}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Text pl={1}>{label}</Text>
                    <Spacer />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      icon={<DeleteIcon />}
                      variant="ghost"
                      onClick={() => {
                        setDeleteLabelValue(label);
                        deleteLabel({ variables: { label } });
                      }}
                      isLoading={
                        deleteLabelLoading && label === deleteLabelValue
                      }
                    />
                  </Stack>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const PUSH_TASK = gql`
  mutation pushTask($taskId: String!) {
    pushTask(taskId: $taskId)
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($taskId: String!) {
    deleteTask(taskId: $taskId)
  }
`;

const CLOSE_TASK = gql`
  mutation closeTask($taskId: String!) {
    closeTask(taskId: $taskId)
  }
`;

const ADD_LABEL = gql`
  mutation addLabel($label: String!) {
    addLabel(label: $label)
  }
`;

const DELETE_LABEL = gql`
  mutation deleteLabel($label: String!) {
    deleteLabel(label: $label)
  }
`;