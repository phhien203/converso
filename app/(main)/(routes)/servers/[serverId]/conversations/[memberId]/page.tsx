export default async function MemberIdPage({
  params,
}: {
  params: { memberId: string }
}) {
  return <div>Member id page, {params.memberId}</div>
}
