import { createFileRoute } from "@tanstack/react-router";
import { Text, Button, Grid, TextField, Box, Heading } from "@radix-ui/themes";
import { z } from "zod";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (typeof email === "string") {
      const result = z
        .string()
        .email("Please enter a valid email address")
        .safeParse(email);
      if (!result.success) {
        alert(result.error.errors[0].message);
        setIsSubmitting(false);
        return;
      }

      try {
        const res = await fetch(
          `https://script.google.com/macros/s/AKfycbzYR-ESdzFrMNqy3P4Y-Xzk6u0zNNAY09vDW8MYblNoNtoX-PRs7UmHMWNMepMycSnecg/exec?email=${encodeURIComponent(email)}`
        );
        const data = await res.json();

        if (data.success) {
          alert("You're on the list!");
        } else {
          alert(data.reason || "Something went wrong");
        }
      } catch (err) {
        alert("Submission failed. Please try again.");
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box mb="2">
        <img
          src="/den_logo.svg"
          alt="den logo"
          style={{ width: 48, height: 48 }}
        />
        <Heading>den.computer</Heading>
      </Box>

      <Box
        style={{
          background: "var(--gray-a2)",
          border: "1px dashed var(--gray-a7)",
        }}
        maxWidth="400px"
        minWidth="300px"
        p="4"
      >
        <form onSubmit={handleSubmit}>
          <Grid gap="3">
            <Heading size="3">Join the waitlist</Heading>
            <Text>
              Enter your email address and we'll let you know when your spot is
              ready.
            </Text>
            <TextField.Root
              name="email"
              type="email"
              size="2"
              placeholder="Email address"
            />
            <Button type="submit" size="2" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Join the waitlist"}
            </Button>
          </Grid>
        </form>
      </Box>
    </>
  );
}
