import { navigate, PageProps } from 'gatsby';
import * as React from 'react';
import ProblemSolutions from '../components/ProblemSolutions';
import SubmitProblemSolutionModal from '../components/SubmitProbemSolutionModal';
import { Problem } from '../models/problem';

export default function ProblemSolutionsPage(props: PageProps) {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);

  // Note: In the future, maybe this page should be generated by gatsby
  // or we can import all the problems as a big JSON file or something.
  const givenProblem = props.location.state?.problem;

  React.useEffect(() => {
    if (!givenProblem) navigate('/', { replace: true });
  }, []);

  if (!givenProblem) {
    return null;
  }

  // For some reason, passing in the problem as Gatsby navigation state doesn't seem to persist the class info.
  const problem = new Problem(
    givenProblem.source,
    givenProblem.name,
    givenProblem.id,
    givenProblem.difficulty,
    givenProblem.starred,
    givenProblem.tags,
    givenProblem.solID,
    givenProblem.solQuality
  );

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleShowSubmitSolutionModal = () => {
    setIsSubmitModalOpen(true);
  };

  return (
    <>
      <ProblemSolutions
        onClose={handleGoBack}
        showSubmitSolutionModal={handleShowSubmitSolutionModal}
        problem={problem}
      />
      <SubmitProblemSolutionModal
        problem={problem}
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </>
  );
}
