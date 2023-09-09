export default async function ChannelIdPage({
  params,
}: {
  params: { channelId: string }
}) {
  return <div>Channel id page, {params.channelId}</div>
}
