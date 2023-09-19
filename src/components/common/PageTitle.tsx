import {
  Text,
  Heading,
  VStack,
  StackProps,
} from "@chakra-ui/react";

interface PageTitleProps extends StackProps {
  title: string;
  subtitle?: string;
  icon?: any,
}

export default function PageTitle({
  title,
  subtitle,
  icon,
  ...props
}: PageTitleProps) {
  return (
    <VStack {...props} spacing={5} align='center' mb="30px">
      {icon}
      <Heading textAlign="center" fontSize={{base:"24px",md:"32px"}} fontWeight={600} >{title}</Heading>
      <Text fontSize={{base:"16px",md:"16px"}} >{subtitle}</Text>
    </VStack>
  );
}
