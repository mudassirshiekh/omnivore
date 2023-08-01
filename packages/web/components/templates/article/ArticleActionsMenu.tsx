import { Separator } from '@radix-ui/react-separator'
import { ArchiveBox, Notebook, Info, Trash, Tray, Tag } from 'phosphor-react'
import { ArticleAttributes } from '../../../lib/networking/queries/useGetArticleQuery'
import { Button } from '../../elements/Button'
import { Box, SpanBox } from '../../elements/LayoutPrimitives'
import { TooltipWrapped } from '../../elements/Tooltip'
import { styled, theme } from '../../tokens/stitches.config'
import { ReaderSettings } from '../../../lib/hooks/useReaderSettings'
import { useRef } from 'react'
import { ArchiveIcon } from '../../elements/icons/ArchiveIcon'
import { NotebookIcon } from '../../elements/icons/NotebookIcon'
import { TrashIcon } from '../../elements/icons/TrashIcon'
import { LabelIcon } from '../../elements/icons/LabelIcon'
import { EditInfoIcon } from '../../elements/icons/EditInfoIcon'
import { UnarchiveIcon } from '../../elements/icons/UnarchiveIcon'

export type ArticleActionsMenuLayout = 'top' | 'side'

type ArticleActionsMenuProps = {
  article?: ArticleAttributes
  layout: ArticleActionsMenuLayout
  showReaderDisplaySettings?: boolean
  readerSettings: ReaderSettings
  articleActionHandler: (action: string, arg?: unknown) => void
}

type MenuSeparatorProps = {
  layout: ArticleActionsMenuLayout
}

const MenuSeparator = (props: MenuSeparatorProps): JSX.Element => {
  const LineSeparator = styled(Separator, {
    width: '100%',
    margin: 0,
    borderBottom: `1px solid ${theme.colors.thHighContrast.toString()}`,
    my: '8px',
  })
  return props.layout == 'side' ? <LineSeparator /> : <></>
}

export function ArticleActionsMenu(
  props: ArticleActionsMenuProps
): JSX.Element {
  const displaySettingsButtonRef = useRef<HTMLElement | null>(null)

  return (
    <>
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: props.layout == 'side' ? 'column' : 'row',
          justifyContent: props.layout == 'side' ? 'center' : 'flex-end',
          gap: props.layout == 'side' ? '15px' : '25px',
          paddingTop: '6px',
        }}
      >
        <SpanBox
          css={{
            display: 'flex',
            alignItems: 'center',
            '@mdDown': {
              display: 'none',
            },
          }}
        >
          {props.article ? (
            <>
              <Button
                style="articleActionIcon"
                onClick={() => props.readerSettings.setShowSetLabelsModal(true)}
              >
                <TooltipWrapped
                  tooltipContent="Edit labels (l)"
                  tooltipSide={props.layout == 'side' ? 'right' : 'bottom'}
                >
                  <SpanBox ref={displaySettingsButtonRef}>
                    <LabelIcon
                      size={24}
                      color={theme.colors.thHighContrast.toString()}
                    />
                  </SpanBox>
                </TooltipWrapped>
              </Button>
              <MenuSeparator layout={props.layout} />
            </>
          ) : (
            <Button
              style="articleActionIcon"
              css={{
                '@smDown': {
                  display: 'flex',
                },
              }}
            >
              <LabelIcon
                size={24}
                color={theme.colors.thHighContrast.toString()}
              />
            </Button>
          )}
        </SpanBox>

        <Button
          style="articleActionIcon"
          onClick={() => props.articleActionHandler('setLabels')}
          css={{
            display: 'none',
            '@mdDown': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <LabelIcon size={24} color={theme.colors.thHighContrast.toString()} />
        </Button>

        <Button
          style="articleActionIcon"
          onClick={() => props.articleActionHandler('showHighlights')}
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TooltipWrapped
            tooltipContent="View Notebook (t)"
            tooltipSide={props.layout == 'side' ? 'right' : 'bottom'}
          >
            <NotebookIcon
              size={24}
              color={theme.colors.thHighContrast.toString()}
            />
          </TooltipWrapped>
        </Button>

        <Button
          style="articleActionIcon"
          onClick={() => props.articleActionHandler('showEditModal')}
          css={{
            display: 'flex',
            alignItems: 'center',
            '@mdDown': {
              display: 'none',
            },
          }}
        >
          <TooltipWrapped
            tooltipContent="Edit Info (i)"
            tooltipSide={props.layout == 'side' ? 'right' : 'bottom'}
          >
            <EditInfoIcon
              size={24}
              color={theme.colors.thHighContrast.toString()}
            />
          </TooltipWrapped>
        </Button>

        <MenuSeparator layout={props.layout} />

        <Button
          style="articleActionIcon"
          onClick={() => {
            props.articleActionHandler('delete')
          }}
          css={{
            display: 'flex',
            alignItems: 'center',
            '@mdDown': {
              display: 'none',
            },
          }}
        >
          <TooltipWrapped
            tooltipContent="Remove (#)"
            tooltipSide={props.layout == 'side' ? 'right' : 'bottom'}
          >
            <TrashIcon
              size={24}
              color={theme.colors.thHighContrast.toString()}
            />
          </TooltipWrapped>
        </Button>

        {!props.article?.isArchived ? (
          <Button
            style="articleActionIcon"
            onClick={() => props.articleActionHandler('archive')}
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TooltipWrapped
              tooltipContent="Archive (e)"
              tooltipSide={props.layout == 'side' ? 'right' : 'bottom'}
            >
              <ArchiveIcon
                size={24}
                color={theme.colors.thHighContrast.toString()}
              />
            </TooltipWrapped>
          </Button>
        ) : (
          <Button
            style="articleActionIcon"
            onClick={() => props.articleActionHandler('unarchive')}
          >
            <TooltipWrapped
              tooltipContent="Unarchive (u)"
              tooltipSide={props.layout == 'side' ? 'right' : 'bottom'}
            >
              <UnarchiveIcon
                size={24}
                color={theme.colors.thHighContrast.toString()}
              />
            </TooltipWrapped>
          </Button>
        )}

        {/* <MenuSeparator layout={props.layout} />
      <Button style='articleActionIcon'>
        <DotsThree size={24} color={theme.colors.readerFont.toString()} />
      </Button> */}
      </Box>
    </>
  )
}
