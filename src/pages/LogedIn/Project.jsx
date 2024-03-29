import React from 'react';
import {
  VStack,
  Box,
  Text,
  Divider,
  Heading,
  Wrap,
  WrapItem,
  Link,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { useQuery, gql } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { NotFound } from '../NotFound';
import { MemberCard } from '../../components/project/MemberCard';

export const Project = props => {
  const { projectId } = props.match.params;

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { projectId },
    skip: !projectId,
    fetchPolicy: 'no-cache',
  });

  const project = data ? data.getProject.project : null;
  console.log(project);
  if (loading || !project) {
    return <Loading />;
  }

  if (error || !projectId) {
    return <NotFound />;
  }

  return (
    <Box maxW="container.xl" px={10} pt={2} mx="auto">
      <VStack mt={4} alignItems="start" w="full" justify="center">
        <Box w="full" p={'6'} borderWidth="1px" rounded="md">
          <Heading as="h1" size="2xl">
            {project.title}{' '}
            {project.closed ? (
              <Badge colorScheme="red">Closed</Badge>
            ) : (
              <Badge colorScheme="green">Open</Badge>
            )}
          </Heading>

          <Text mt={6} py={2} fontSize="xl" fontWeight="black">
            description:
          </Text>
          <Text fontStyle="italic">"{project.description}"</Text>
          <Divider py={3} />
          <VStack pt={1} alignItems="start" w="full" justify="center">
            <VStack alignItems="start">
              <Text fontStyle="italic" fontWeight="bold">
                created by:
              </Text>
              <VStack justifyContent="center">
                <Link
                  isExternal
                  as={RouterLink}
                  to={`/user/${project.owner.id}`}
                >
                  <Avatar size="xl" src={project.owner.avatar} mb={1} />
                </Link>
              </VStack>
              <Text fontSize="md">{project.owner.name}</Text>
              <Text fontSize="sm">
                created on{' '}
                {
                  new Date(project.createdAt)
                    .toLocaleString('en-GB')
                    .split(',')[0]
                }
              </Text>
            </VStack>
          </VStack>
        </Box>
        {project.members.length > 0 && (
          <Box pt={12} w="full">
            <Heading as="h1" size="2xl">
              Members
            </Heading>
            <Divider />
            <Wrap align="center" justify="center" pb="2">
              {project.members.map(member => (
                <WrapItem key={member.dev.id}>
                  <MemberCard member={member} />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}
        {project.previousMembers.length > 0 && (
          <Box pt={12} w="full">
            <Heading as="h1" size="2xl">
              Previous Members
            </Heading>
            <Divider />
            <Wrap align="center" justify="center" pb="2">
              {project.previousMembers.map(member => (
                <WrapItem key={member.dev.id}>
                  <MemberCard member={member} />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

const GET_PROJECT = gql`
  query getProject($projectId: String!) {
    getProject(projectId: $projectId) {
      project {
        id
        owner {
          id
          name
          avatar
        }
        closed
        title
        description
        members {
          dev {
            id
            name
            avatar
          }
          title
          skills
        }
        previousMembers {
          dev {
            id
            name
            avatar
          }
          title
          skills
        }
        createdAt
      }
    }
  }
`;
