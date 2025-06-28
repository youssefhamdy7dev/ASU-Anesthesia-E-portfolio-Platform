import {
  Link as UILink,
  Navbar,
  Text,
  Dropdown,
  Loading,
  User,
} from "@nextui-org/react";

import NextLink from "next/link";

import { useEffect, useMemo, useState, forwardRef } from "react";
import { auth } from "@/src/services";
import { Admin as AdminType } from "@/src/services/api/auth/admin";
import { useRouter } from "next/router";

export default function AdminLayout() {
  const router = useRouter(),
    [isLoaded, setLoaded] = useState(false),
    [userData, setUserData] = useState<AdminType | null>(null),
   
    Link = forwardRef((props, ref: any) => (
      <UILink {...props} as={NextLink} ref={ref} />
    )),
    select = (path) => {
      const route = path.currentKey;
      switch (route) {
        case "logout":
          auth.admin.logout();
          window.location.href = "/supervisor/login";
          break;
        default:
          break;
      }
    };

  useEffect(() => {
    if (auth.admin.adminInfo) {
      auth.admin.getMe().then((user) => {
        setLoaded(true);
        if (user) {
          auth.admin.refresh(user);
          setUserData(user as AdminType);
        } else {
          auth.admin.logout();
        }
      });
    } else {
      setLoaded(true);
    }
  }, []);

  const Navigation = useMemo(() => {
    if (isLoaded) {
      if (userData) {
        return (
          <Navbar.Content>
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger
                  css={{
                    cursor: "pointer",
                    img: { cursor: "pointer" },
                    "&:hover": {
                      backgroundColor: "$accents0",
                    },
                    padding: "$5 $8",
                    borderRadius: "$pill",
                    transition: "$default",
                  }}
                >
                  <User
                    bordered
                    as="button"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    name={auth.admin?.adminInfo?.info?.name
                      .split(" ")
                      .splice(0, 2)
                      .join(" ")}
                    description={auth.admin?.adminInfo?.info?.username}
                    zoomed
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu onSelectionChange={select} selectionMode="single">
                <Dropdown.Item
                  key="setting"
                  color="secondary"
                  css={{ height: "$18", backgroundColor: "$secondaryLight" }}
                >
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {auth.admin?.adminInfo?.info?.email}
                  </Text>
                </Dropdown.Item>

                <Dropdown.Item key="logout" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        );
      }
    } else {
      return (
        <Navbar.Content>
          <Loading color={"primary"} />
        </Navbar.Content>
      );
    }
  }, [isLoaded, userData, router.asPath]);
  return (
    <>
      {userData && (
        <Navbar.Content hideIn="xs" variant={"underline-rounded"}>
          <Navbar.Link
            isActive={router.asPath == "/supervisor" ? true : false}
            isFocusVisible={"false"}
            as={Link}
            href="/supervisor"
          >
            Home
          </Navbar.Link>
          {/* {isAdmin && (
            <Navbar.Link
              isActive={router.asPath == "/supervisor/accounts" ? true : false}
              isFocusVisible={"false"}
              as={Link}
              href="/supervisor/accounts"
            >
              Accounts
            </Navbar.Link>
          )}
          {isAdmin && (
            <Navbar.Link
              isActive={
                router.asPath == "/supervisor/accounts/pending" ? true : false
              }
              isFocusVisible={"false"}
              as={Link}
              href="/supervisor/accounts/pending"
            >
              Pending Accounts
            </Navbar.Link>
          )}

          <Navbar.Link
            isActive={
              router.asPath == "/supervisor/cases/pending-case-anesthetic"
                ? true
                : false
            }
            isFocusVisible={"false"}
            as={Link}
            href="/supervisor/cases/pending-case-anesthetic"
          >
            Pending Anesthetic
          </Navbar.Link>
          <Navbar.Link
            isActive={
              router.asPath == "/supervisor/cases/pending-case-intensive"
                ? true
                : false
            }
            isFocusVisible={"false"}
            as={Link}
            href="/supervisor/cases/pending-case-intensive"
          >
            Pending Intensive
          </Navbar.Link>
          <Navbar.Link
            isActive={
              router.asPath == "/supervisor/cases/pending-case-procedure"
                ? true
                : false
            }
            isFocusVisible={"false"}
            as={Link}
            href="/supervisor/cases/pending-case-procedure"
          >
            Pending Procedure
          </Navbar.Link>

          {isAdmin && (
            <Navbar.Link
              isActive={
                router.asPath == "/supervisor/pending-rotation" ? true : false
              }
              isFocusVisible={"false"}
              as={Link}
              href="/supervisor/pending-rotation"
            >
              Pending Rotation
            </Navbar.Link>
          )} */}
        </Navbar.Content>
      )}
      {Navigation}
    </>
  );
}
